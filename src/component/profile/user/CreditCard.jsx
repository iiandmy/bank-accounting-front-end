import {Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import { Circle } from "@mui/icons-material";
import React from "react";

export const CreditCard = (
	{
		id,
		status,
		creditAmount,
		rate,
		firstPayment,
		startDate,
		endDate
	}
) => {
	const chooseColor = (creditStatus) => {
		switch (creditStatus) {
			case "ACTIVE": return "#1975d2"
			case "PENDING": return "#FAA34E"
			case "PAID": return "#33BE51"
			default: return ""
		}
	}

	return (
		<Card key={id} sx={{marginBottom: "1rem"}}>
			<CardContent>
				<Stack direction="row" alignItems="center" sx={{marginBottom: "0.5rem"}}>
					<Circle
						sx={{
							marginRight: "0.5rem",
							color: chooseColor(status),
							fontSize: "10px"
						}}
					/>
					<Typography variant="h6">
						{status}
					</Typography>
				</Stack>
				<Divider />
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography gutterBottom variant="body2" sx={{paddingY: "1rem"}}>
							Amount: {creditAmount}
						</Typography>
						<Typography gutterBottom variant="body2" sx={{paddingBottom: "1rem"}}>
							First Payment: {firstPayment}
						</Typography>
						<Typography gutterBottom variant="body2">
							Rate: {`${rate.toFixed(1)}%`}
						</Typography>
					</Grid>
					<Grid item>
						<Typography gutterBottom variant="body2" sx={{paddingY: "1rem"}}>
							StartDate: {startDate}
						</Typography>
						<Typography gutterBottom variant="body2">
							EndDate: {endDate}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}