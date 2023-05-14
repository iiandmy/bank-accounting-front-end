import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import React from "react";

export const RegistrationPage = () => {
	const navigate = useNavigate()

	const handleLoginClick = () => {
		navigate("/login")
	}

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Container>
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Bank Accounting
							</Typography>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<Button onClick={handleLoginClick} variant="text" color="inherit">Login</Button>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
		</>
	)
}