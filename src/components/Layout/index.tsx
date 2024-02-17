import { Layout } from "antd";
import React from "react";

function InternalLayout(props: {
  content: React.ReactNode;
  sider: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <Layout style={{ height: '100%'}}>
      <Layout.Header style={{ background: "#fff", textAlign: 'center' }} >{props.header}</Layout.Header>
      <Layout>
        <Layout.Content>{props.content}</Layout.Content>
        <Layout.Sider width={300} title="Results" style={{ background: "#fff" }}>
          {props.sider}
        </Layout.Sider>
      </Layout>
    </Layout>
  );
}

export default InternalLayout;
