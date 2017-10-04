import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import FooterCommon from './../components/FooterCommon'

import 'antd/lib/layout/style/css'

const { Content } = Layout

class App extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <p>error</p>
                    </div>
                </Content>
                <FooterCommon/>
            </Layout>
        )
    }
}


export default App