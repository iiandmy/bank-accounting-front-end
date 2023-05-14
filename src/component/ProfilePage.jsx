import React, { useEffect } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	Button,
	Container,
} from "@mui/material";
import { RefreshOutlined} from '@mui/icons-material';
import { observer } from "mobx-react-lite";
import AuthStorage from "../storage/AuthStorage";
import { useNavigate } from "react-router-dom";
import ProfileStorage from "../storage/ProfileStorage";
import { UserComponent } from "./profile/user/UserComponent";
import { AdminComponent } from "./profile/admin/AdminComponent";

export const ProfilePage = observer(() => {
	let navigate = useNavigate()

	useEffect(() => {
		if (!AuthStorage.fetchFromLocalStorage()) {
			navigate("/login")
		}
		ProfileStorage.fetchCredits()
	}, [])

	const handleRefreshClick = async () => {
		await ProfileStorage.fetchCredits()
	}

	const handleLogOutClick = () => {
		AuthStorage.logout()
		navigate("/login")
	}

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
								<Button onClick={handleLogOutClick} variant="text" color="inherit">Log out</Button>
								<IconButton
									size="large"
									color="inherit"
									onClick={handleRefreshClick}
								>
									<RefreshOutlined />
								</IconButton>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
			<Container>
				{
					AuthStorage.isAdmin ?
						<AdminComponent /> : <UserComponent />
				}
			</Container>
		</div>
	)
})