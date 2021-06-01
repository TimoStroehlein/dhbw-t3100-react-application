import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Container, Dropdown, Icon, Nav, Navbar, Sidebar, Sidenav} from 'rsuite';
import './styles.scss';
import {SettingsScreen} from '../screens/Settings';
import {HomeScreen} from '../screens/Home';
import {HelpScreen} from '../screens/Help';
import {SASTCodeInjection} from '../screens/SAST/CodeInjection';
import {SASTPathTraversal} from '../screens/SAST/PathTraversal';
import {DASTCrossSiteRequestForgery} from '../screens/DAST/CrossSiteRequestForgery';
import {DASTCrossSiteScripting} from '../screens/DAST/CrossSiteScripting';
import {DASTSqlInjection} from '../screens/DAST/SqlInjection';

const Routes = (): JSX.Element => {
    return (
        <Container className="content">
            <Route exact path="/">
                <HomeScreen/>
            </Route>
            <Route path="/sast/code-injection">
                <SASTCodeInjection/>
            </Route>
            <Route path="/sast/path-traversal">
                <SASTPathTraversal/>
            </Route>
            <Route path="/dast/cross-site-scripting">
                <DASTCrossSiteScripting/>
            </Route>
            <Route path="/dast/Cross-site-request-forgery">
                <DASTCrossSiteRequestForgery/>
            </Route>
            <Route path="/dast/sql-injection">
                <DASTSqlInjection/>
            </Route>
            <Route path="/settings">
                <SettingsScreen/>
            </Route>
            <Route path="/help">
                <HelpScreen/>
            </Route>
        </Container>
    );
}

const NavigationToggle = ({ expand, onChange }: {expand: boolean, onChange: () => void}): JSX.Element => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav>
                    <Dropdown
                        placement="topStart"
                        trigger="click"
                        renderTitle={() => {
                            return <Icon className="icon" icon="cog" />;
                        }}
                    >
                        <Dropdown.Item componentClass={Link} to="/help">Help</Dropdown.Item>
                        <Dropdown.Item componentClass={Link} to="/settings">Settings</Dropdown.Item>
                    </Dropdown>
                </Nav>

                <Nav pullRight>
                    <Nav.Item className="nav-toggle-item" onClick={onChange}>
                        <Icon icon={expand ? 'angle-left' : 'angle-right'} />
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};

export const NavigationSidebar = (): JSX.Element => {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState(1);

    return (
        <div>
            <Container>
                <Router>
                    <Sidebar
                        className="sidebar"
                        width={expanded ? 260 : 56}
                        collapsible
                    >
                        <Sidenav
                            expanded={expanded}
                            defaultOpenKeys={['3']}
                            appearance="subtle"
                            activeKey={activeKey}
                            onSelect={(eventKey) => {setActiveKey(eventKey)}}
                        >
                            <Sidenav.Header>
                                <div className="header">
                                    <Icon className="header-icon" icon="user-secret" size="lg" />
                                    <span className="header-span">DHBW T3100</span>
                                </div>
                            </Sidenav.Header>
                            <Sidenav.Body>
                                <Nav>
                                    <Nav.Item componentClass={Link} to="/" eventKey="1" active icon={<Icon icon="home" />}>
                                        Home
                                    </Nav.Item>
                                    <Dropdown
                                        eventKey="2"
                                        trigger="hover"
                                        title="SAST"
                                        icon={<Icon icon="code" />}
                                        placement="rightStart"
                                    >
                                        <Dropdown.Item componentClass={Link} to="/sast/code-injection" eventKey="2-1">
                                            Code Injection
                                        </Dropdown.Item>
                                        <Dropdown.Item componentClass={Link} to="/sast/path-traversal" eventKey="2-2">
                                            Path Traversal
                                        </Dropdown.Item>
                                    </Dropdown>
                                    <Dropdown
                                        eventKey="3"
                                        trigger="hover"
                                        title="DAST"
                                        icon={<Icon icon="shield" />}
                                        placement="rightStart"
                                    >
                                        <Dropdown.Item componentClass={Link} to="/dast/cross-site-scripting" eventKey="3-1">
                                            Cross-Site Scripting (XSS)
                                        </Dropdown.Item>
                                        <Dropdown.Item componentClass={Link} to="/dast/cross-site-request-forgery" eventKey="3-2">
                                            Cross Site Request Forgery
                                        </Dropdown.Item>
                                        <Dropdown.Item componentClass={Link} to="/dast/sql-injection" eventKey="3-3">
                                            SQL Injection
                                        </Dropdown.Item>
                                    </Dropdown>
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                        <NavigationToggle expand={expanded} onChange={() => setExpanded(!expanded)} />
                    </Sidebar>
                    <Routes/>
                </Router>
            </Container>
        </div>
    );
}
