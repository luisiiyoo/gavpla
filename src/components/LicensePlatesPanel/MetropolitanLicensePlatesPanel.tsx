import React, { useState } from 'react';

import connector from 'src/connector';
import {
  BELicensePlatesData,
  BEQueryLicensePlatesData,
} from 'src/connector/backend.types';
import { StateType } from 'src/redux/reducers/Main/Main.types';
import { handleErrorMessage, toTitleCase, useConstructor } from 'src/utils';
import ErrorDisplay from '../ErrorDisplay';
import Header from '../Header';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { METROPOLITAN_ROUTE } from 'src/routers/constants';

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from 'reactstrap';
import { MxMap } from '../Maps/MxMap';
import { LicensePlateItemsPanel } from './LicensePlateItemsPanel/LicensePlateItemsPanel';

export interface MetropolitanLicensePlatesPanelProps {}

const MetropolitanLicensePlatesPanel: React.FC<MetropolitanLicensePlatesPanelProps> = () => {
  const { userID, languageCode, stateCodes }: StateType = useSelector(
    (state) => state.main,
  );

  const [
    metropolitanDataByStateCodes,
    setMetropolitanDataByStateCodes,
  ] = useState<Map<string, BELicensePlatesData[]>>(new Map());
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [
    selectedMetropolitanStateCodes,
    setSelectedMetropolitanStateCodes,
  ] = useState<string>('');
  // const [open, setOpen] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    statusCode: -1,
    message: '',
  });

  const selectMetropolitanArea = (stateCodes: string) => {
    if (stateCodes === selectedMetropolitanStateCodes) {
      setSelectedMetropolitanStateCodes('stateCodes');
      setFilteredStates([]);
    } else {
      setSelectedMetropolitanStateCodes(stateCodes);
      let selectStates = stateCodes.split('-');
      if (selectStates.includes('DF')) selectStates.push('CDMX');
      setFilteredStates(selectStates);
    }
  };

  useConstructor(async () => {
    try {
      setIsLoading(true);
      const params: BEQueryLicensePlatesData = {
        region_code: 'METROPOLITAN',
      };
      const data: BELicensePlatesData[] = await connector.getLicensePlatesData(
        userID,
        params,
      );

      const dataByStadeCodes = new Map<string, BELicensePlatesData[]>();
      for (const lp of data) {
        const state_codes = lp.state_codes;
        if (!!state_codes) {
          dataByStadeCodes.set(state_codes, [
            ...(dataByStadeCodes.get(state_codes) || []),
            lp,
          ]);
        }
      }

      // Set the map
      setMetropolitanDataByStateCodes(dataByStadeCodes);
    } catch (error) {
      setError(handleErrorMessage(error, languageCode));
    } finally {
      setIsLoading(false);
    }
  });

  return !!error.message ? (
    <ErrorDisplay message={error.message} statusCode={error.statusCode} />
  ) : (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="MetropolitanLicensePlatesPanel">
          <Header title={toTitleCase(METROPOLITAN_ROUTE.title)} />
          <MxMap
            selectStateHandler={(val) => {}}
            filteredStates={filteredStates}
            staticMap={true}
          />
          <div className="MetropolitanLicensePlatesPanel-Areas">
            <Accordion
              open={selectedMetropolitanStateCodes}
              {...{ toggle: selectMetropolitanArea }}
            >
              {Array.from(metropolitanDataByStateCodes).map(
                ([statesCodes, licensePlates]) => (
                  <AccordionItem key={statesCodes}>
                    <AccordionHeader targetId={statesCodes}>
                      {statesCodes
                        .split('-')
                        .map((code) => stateCodes[code])
                        .join(' - ')}
                    </AccordionHeader>
                    <AccordionBody accordionId={statesCodes}>
                      <LicensePlateItemsPanel
                        platesDataArray={licensePlates}
                        hideStateName={true}
                      />
                    </AccordionBody>
                  </AccordionItem>
                ),
              )}
            </Accordion>
          </div>
        </div>
      )}
    </>
  );
};

export default MetropolitanLicensePlatesPanel;
