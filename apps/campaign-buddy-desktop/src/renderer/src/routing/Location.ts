export interface HomePageLocation {
	page: 'home';
}

export interface CampaignPageLocation {
	page: 'campaign';
	campaignId: string;
}

export type Location = HomePageLocation | CampaignPageLocation;

export type LocationKind = Location['page'];
export type LocationOfKind<TKind extends LocationKind> = Extract<
	Location,
	{ page: TKind }
>;
