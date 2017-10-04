import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import FormGroup from './../components/form-group.jsx'
import HeadeNav from './../components/HeaderNav'
import FooterCommon from './../components/FooterCommon'

import 'antd/lib/layout/style/css'

const { Content} = Layout

class App extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <HeadeNav />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <FormGroup />
                    </div>
                </Content>
                <FooterCommon />
            </Layout>
        )
    }
}


export default App