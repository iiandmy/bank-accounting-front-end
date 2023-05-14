import {
	AppBar,
	Box,
	Button, Card, CardContent,
	Container, Divider,
	FormControl,
	Input,
	InputLabel,
	Toolbar,
	Typography
} from "@mui/material";
import AuthStorage from "../../storage/AuthStorage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
	const [ email, setEmail ] = useState("")
	const [ password, setPassword ] = useState("")
	const navigate = useNavigate()

	const handleLoginClick = async () => {
		await AuthStorage
			.login(email, password)
			.catch(_ => {
				alert("Error! Check inputs on correct")
				setEmail("")
				setPassword("")
			})
			.then(r => {
				navigate("/")
			})
	}

	const handleRegisterClick = () => navigate("/register")

	const handleEmailChange = (e) => setEmail(e.target.value)
	const handlePasswordChange = (e) => setPassword(e.target.value)

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Container>
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Bank Accounting
							</Typography>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<Button onClick={handleRegisterClick} variant="text" color="inherit">Register</Button>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
			<Container maxWidth="sm">
				<Card maxWidth={365} sx={{marginTop: "2rem"}}>
					<CardContent>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>LOGIN</Typography>
						<Divider sx={{marginY: "1rem"}}/>
						<Box>
							<FormControl variant="standard" sx={{width: "100%"}}>
								<InputLabel>Email</InputLabel>
								<Input onChange={ handleEmailChange } />
							</FormControl>
							<FormControl variant="standard" sx={{width: "100%", marginY: "1rem"}}>
								<InputLabel>Password</InputLabel>
								<Input onChange={ handlePasswordChange } />
							</FormControl>
						</Box>
						<Divider sx={{marginBottom: "1rem"}} />
						<Button variant="contained" onClick={handleLoginClick}>Login</Button>
					</CardContent>
				</Card>
			</Container>
		</div>
	)
}