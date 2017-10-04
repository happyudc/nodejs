/**
 * Created by happyu on 2017/10/4.
 */
import React from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
import HeaderNav from '../components/HeaderNav';
import FooterCommon from '../components/FooterCommon'

class App extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <HeaderNav/>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280}}>
                        <p>Index</p>
                    </div>
                </Content>
                <FooterCommon/>
            </Layout>
        )
    }
}

export default App

