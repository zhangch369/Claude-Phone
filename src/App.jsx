import React from 'react'
import GdpChart from './components/GdpChart'

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      padding: '40px 24px',
      fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif",
      color: '#f1f5f9',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* 标题区 */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 100,
            padding: '6px 18px',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 20 }}>🇨🇳</span>
            <span style={{ color: '#a5b4fc', fontSize: 13, fontWeight: 500 }}>经济数据可视化</span>
            <span style={{ fontSize: 20 }}>🇺🇸</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontWeight: 800,
            margin: '0 0 12px',
            background: 'linear-gradient(90deg, #ef4444, #a78bfa, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            中美 GDP 走势对比
          </h1>
          <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>
            1980 — 2023 &nbsp;·&nbsp; 现价美元
          </p>
        </div>

        {/* 图表容器 */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          padding: '32px 28px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        }}>
          <GdpChart />
        </div>

        {/* 底部注释 */}
        <p style={{ textAlign: 'center', color: '#334155', fontSize: 12, marginTop: 24 }}>
          由 Claude AI 生成 · 数据截至 2023 年
        </p>
      </div>
    </div>
  )
}
