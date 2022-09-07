import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

import { motion } from 'framer-motion'
const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="black" variant="dark">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: -180 }}
                    animate={{ opacity: 5, y: 0 }}
                    transition={{
                      ease: "easeInOut",
                      duration: 1,
                      delay: 0.6,
                    }}
                >
                <Navbar.Brand href="http://arslaniqbal.tech">
            
            <img src="./MAI.png" height="40px" width="80px" />
          </Navbar.Brand>

                </motion.div>
        
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 5, y: 0 }}
                    transition={{
                      ease: "easeInOut",
                      duration: 1,
                      delay: 0.6,
                    }}>
                  <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
                    </Nav>
                  </motion.div>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light" onClick={web3Handler}>
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;