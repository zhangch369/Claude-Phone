import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { gdpData } from '../data/gdp'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: '12px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <p style={{ color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>{label} 年</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} style={{ color: entry.color, margin: '4px 0' }}>
            {entry.name}：<strong style={{ color: '#f1f5f9' }}>${entry.value.toFixed(2)} 万亿</strong>
          </p>
        ))}
        {payload.length === 2 && (
          <p style={{ color: '#94a3b8', marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8, fontSize: 12 }}>
            差距：${Math.abs(payload[1].value - payload[0].value).toFixed(2)} 万亿
            （中国占美国 {((payload[0].value / payload[1].value) * 100).toFixed(1)}%）
          </p>
        )}
      </div>
    )
  }
  return null
}

export default function GdpChart() {
  const [startYear, setStartYear] = useState(1980)
  const [endYear, setEndYear] = useState(2023)

  const filtered = gdpData.filter(d => d.year >= startYear && d.year <= endYear)

  const latestChina = gdpData[gdpData.length - 1].china
  const latestUSA = gdpData[gdpData.length - 1].usa
  const ratio = ((latestChina / latestUSA) * 100).toFixed(1)

  return (
    <div style={{ width: '100%' }}>
      {/* 统计卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        {[
          { label: '中国GDP (2023)', value: `$${latestChina.toFixed(2)}万亿`, color: '#ef4444', sub: '全球第二大经济体' },
          { label: '美国GDP (2023)', value: `$${latestUSA.toFixed(2)}万亿`, color: '#3b82f6', sub: '全球第一大经济体' },
          { label: '中国/美国比值', value: `${ratio}%`, color: '#a78bfa', sub: '2000年时仅为11.8%' },
        ].map(card => (
          <div key={card.label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${card.color}33`,
            borderRadius: 12,
            padding: '16px 20px',
            borderLeft: `3px solid ${card.color}`,
          }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{card.value}</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* 年份筛选 */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: '#94a3b8', fontSize: 13 }}>时间范围：</span>
        {[[1980, 2023], [1990, 2023], [2000, 2023], [2010, 2023]].map(([s, e]) => (
          <button
            key={s}
            onClick={() => { setStartYear(s); setEndYear(e) }}
            style={{
              background: startYear === s ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${startYear === s ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
              color: startYear === s ? '#a5b4fc' : '#94a3b8',
              borderRadius: 6,
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {s}—{e}
          </button>
        ))}
      </div>

      {/* 图表 */}
      <ResponsiveContainer width="100%" height={420}>
        <LineChart data={filtered} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="year"
            stroke="#475569"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke="#475569"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickLine={false}
            tickFormatter={v => `$${v}T`}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 16, color: '#94a3b8', fontSize: 13 }}
            formatter={(value) => <span style={{ color: '#cbd5e1' }}>{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="china"
            name="中国"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#ef4444', strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="usa"
            name="美国"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p style={{ color: '#475569', fontSize: 11, textAlign: 'right', marginTop: 8 }}>
        数据来源：世界银行 World Bank | 单位：万亿美元（现价）
      </p>
    </div>
  )
}
