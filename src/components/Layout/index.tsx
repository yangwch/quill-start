import { Layout } from '@yangwch/y-components'
import React from 'react'

function InternalLayout(props: { content: React.ReactNode, sider: React.ReactNode }) {
  return (
    <Layout>
      <Layout.Header>
        I'm Header
      </Layout.Header>
      <Layout.Content>
        {props.content}
      </Layout.Content>
      <Layout.Sider title='Results' style={{ width: 300 }}>
        {props.sider}
      </Layout.Sider>
    </Layout>
  )
}

export default InternalLayout