import { Card, CardActionArea, CardContent, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { CreateCreditPlanForm } from "./createPlan/CreateCreditPlanForm";
import { AppliancesList } from "./appliances/AppliancesList";

export const AdminComponent = () => {
	const [isCreatingPlan, setModeFlag] = useState(false)
	const handlePendingAppliancesClick = () => {
		setModeFlag(false)
	}

	const handleCreateCreditPlan = () => {
		setModeFlag(true)
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
						<CardActionArea onClick={handlePendingAppliancesClick}>
							<Typography gutterBottom variant="body2">
								Pending appliances
							</Typography>
						</CardActionArea>
						<CardActionArea onClick={handleCreateCreditPlan}>
							<Typography gutterBottom variant="body2">
								Create credit plan
							</Typography>
						</CardActionArea>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={6}>
				{
					isCreatingPlan ?
						<CreateCreditPlanForm
							handleCreate={() => setModeFlag(false)}
						/> :
						<AppliancesList />
				}
			</Grid>
		</Grid>
	)
}