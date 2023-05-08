export interface LeaseType {
	deleted_flag: boolean;
	end_date: string;
	init_date: string;
	is_current_tenant: boolean;
	lease_id: number;
	price: number;
	tenant_id: number;
	unit_id: number;
}
