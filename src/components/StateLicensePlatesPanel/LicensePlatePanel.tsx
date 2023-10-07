import React from 'react';
import connector from 'src/connector';
import { BEQueryLicensePlatesData } from 'src/connector/backend.types';
import { useConstructor } from 'src/utils';

export interface StateLicensePlatesPanelProps {
  languageCode: string;
  userId: string;
  regionCode: string;
  fromYear: number;
  toYear: number;
  // selectStateHandler: (state: string) => void;
  // selectedState: string;
  // filteredStates: string[];
}

export const StateLicensePlatesPanel: React.FC<StateLicensePlatesPanelProps> = ({
  languageCode,
  userId,
  regionCode,
  fromYear = 1968,
  toYear = 1999,
}) => {
  useConstructor(async () => {
    const params: BEQueryLicensePlatesData = {
      region_code: regionCode,
      from_year: fromYear,
      to_year: toYear,
    };
    const platesData: BEQueryLicensePlatesData[] = await connector.getLicensePlatesData(
      userId,
      params,
    );

    // setIsLoading(false);
  });

  return <></>;
};
