import service from '@services/index';
import Config from 'react-native-config';

export type AddressType = {
  custom_full_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  address_type: string;
  pincode: string;
  phone: string;
};

const AddressService = {
  getAllCountries: async () => {
    try {
      const res: any = await service.get(Config.GET_COUNTRIES!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  getBillingAddresses: async () => {
    try {
      const res: any = await service.get(Config.BILLING_ADDRESS_LIST!);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  addAddress: async (params: AddressType) => {
    try {
      const res: any = await service.post(Config.ADD_CART_ADDRESS!, params);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  updateAddress: async (params: {
    name: string;
    custom_full_name?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    country?: string;
    address_type?: string;
    pincode?: string;
    phone?: string;
  }) => {
    try {
      const res: any = await service.post(Config.UPDATE_CART_ADDRESS!, params);
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  deleteAddress: async (name: string) => {
    try {
      const res: any = await service.post(Config.DELETE_ADDRESS!, {
        name,
      });
      return res?.data;
    } catch (error) {
      return error;
    }
  },
};

export default AddressService;
