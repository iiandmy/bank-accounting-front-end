import { observer } from "mobx-react-lite";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Divider,
	Grid,
	Typography
} from "@mui/material";
import ProfileStorage from "../../../storage/ProfileStorage";
import React, { useState } from "react";
import { CreditList } from "./creditList/CreditList";
import { ApplianceForm } from "./applyCredit/ApplianceForm";

export const UserComponent = observer(() => {
	const [isCreatingAppliance, setApplianceFlag] = useState(false)

	const handleAllClick = () => {
		setApplianceFlag(false)
		ProfileStorage.setFilter("")
	}

	const handleActiveClick = () => {
		setApplianceFlag(false)
		ProfileStorage.setFilter("ACTIVE")
	}

	const handlePendingClick = () => {
		setApplianceFlag(false)
		ProfileStorage.setFilter("PENDING")
	}

	const handlePaidClick = () => {
		setApplianceFlag(false)
		ProfileStorage.setFilter("PAID")
	}

	const handleCreateAppliance = () => {
		setApplianceFlag(false)
	}

	return (
		<Grid container spacing={2} justifyContent="space-evenly" sx={{marginY: "1rem"}}>
			<Grid item xs={3}>
				<Card>
					<CardContent>
						<Typography gutterBottom variant="h6" component="div">
							Actions
						</Typography>
						<Divider sx={{marginY: "1rem"}} />
						<CardActionArea onClick={handleAllClick}>
							<Typography gutterBottom variant="body2">
								All Credits
							</Typography>
						</CardActionArea>
						<CardActionArea onClick={handleActiveClick}>
							<Typography gutterBottom variant="body2">
								Active Credits
							</Typography>
						</CardActionArea>
						<CardActionArea onClick={handlePendingClick}>
							<Typography gutterBottom variant="body2">
								Pending Credits
							</Typography>
						</CardActionArea>
						<CardActionArea onClick={handlePaidClick}>
							<Typography gutterBottom variant="body2">
								Paid Credits
							</Typography>
						</CardActionArea>
						<Divider sx={{marginY: "1rem"}} />
						<Box sx={{ flexGrow: 1 }}>
							<Button variant="contained" sx={{ width: "100%" }} onClick={() => setApplianceFlag(true)}>Apply for Credit</Button>
						</Box>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={6}>
				{
					isCreatingAppliance ?
						<ApplianceForm onCreateAppliance={handleCreateAppliance}/> :
						<CreditList />
				}
			</Grid>
		</Grid>
	)
})