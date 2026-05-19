export interface Region {
  code: string;
  name: string;
  regionName: string;
  islandGroupCode: string;
}

export interface CityMunicipality {
  code: string;
  name: string;
  isCity: boolean;
  isMunicipality: boolean;
  regionCode: string;
}

export interface Barangay {
  code: string;
  name: string;
  cityCode: string;
  municipalityCode?: string | boolean;
  regionCode: string;
}

const BASE_URL = 'https://psgc.gitlab.io/api';

export const psgcService = {
  async getRegions(): Promise<Region[]> {
    try {
      const response = await fetch(`${BASE_URL}/regions/`);
      if (!response.ok) throw new Error('Failed to fetch regions');
      return await response.json() as Region[];
    } catch (error) {
      console.error('Error fetching regions:', error);
      return [];
    }
  },

  async getCitiesAndMunicipalities(regionCode: string): Promise<CityMunicipality[]> {
    if (!regionCode) return [];
    try {
      const response = await fetch(`${BASE_URL}/regions/${regionCode}/cities-municipalities/`);
      if (!response.ok) throw new Error(`Failed to fetch cities/municipalities for region ${regionCode}`);
      return await response.json() as CityMunicipality[];
    } catch (error) {
      console.error(`Error fetching cities for region ${regionCode}:`, error);
      return [];
    }
  },

  async getBarangays(cityCode: string): Promise<Barangay[]> {
    if (!cityCode) return [];
    try {
      const response = await fetch(`${BASE_URL}/cities-municipalities/${cityCode}/barangays/`);
      if (!response.ok) throw new Error(`Failed to fetch barangays for city ${cityCode}`);
      return await response.json() as Barangay[];
    } catch (error) {
      console.error(`Error fetching barangays for city ${cityCode}:`, error);
      return [];
    }
  }
};
