import React from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from 'src/language';
import { MEXICO_STATE_NAME_TO_STATE_CODE } from 'src/utils/constants';
import './style.css';
import NotFoundImage from 'src/images/image-not-found.png';
import { BEStateData } from 'src/connector/backend.types';

export interface InventoryImagesPanelProps {
  backendData: Map<string, BEStateData>;
  dataByYear: Map<string, string[]>;
  dataByState: Map<string, string[]>;
  selectedYear: string;
  selectedState: string;
  filteredStates: string[];
  filteredYears: string[];
}

interface InventoryItem {
  yearCode: string;
  stateCode: string;
  stateName: string;
  condition: number;
  image: string | null;
}

const style: React.CSSProperties = {
  width: '100%',
  alignContent: 'center',
  textAlign: 'center',
  display: 'block',
  justifyContent: 'center',
  padding: '10px 0px 50px 0px',
  fontSize: '16px',
};
const triggerStyle = {
  fontSize: '16px',
  padding: '10px 30px',
  width: '100%',
  borderRadius: '25px',
};
const InventoryImagesPanel = ({
  backendData,
  dataByYear,
  dataByState,
  selectedYear,
  selectedState,
  filteredStates,
  filteredYears,
}: InventoryImagesPanelProps) => {
  const { languageCode } = useSelector((state) => state.main);
  const translation = getTranslation(languageCode, 'MexicoCollection');

  const inventoryItems: InventoryItem[] = [];

  if (!!selectedYear) {
    const stateCodes: string[] = filteredStates.map(
      (stateName) => MEXICO_STATE_NAME_TO_STATE_CODE.get(stateName) || '',
    );

    for (const stateCode of stateCodes) {
      const stateData: BEStateData | undefined = backendData.get(stateCode);
      const stateName = stateData?.name;
      const stateInventoryData = stateData?.inventory;

      if (!stateData || !stateInventoryData || !stateName) return <></>;

      const plateDetails = stateInventoryData[selectedYear];
      const plateCondition = plateDetails?.condition;
      if (!plateCondition) continue;

      const inventoryItem: InventoryItem = {
        yearCode: selectedYear,
        stateCode: stateCode,
        stateName: stateName,
        condition: plateCondition,
        image: plateDetails?.image,
      };
      inventoryItems.push(inventoryItem);
    }
  } else {
    const stateCode: string =
      MEXICO_STATE_NAME_TO_STATE_CODE.get(selectedState) || '';
    const stateData: BEStateData | undefined = backendData.get(stateCode);

    const stateName = stateData?.name;
    const stateInventoryData = stateData?.inventory;

    if (!stateData || !stateInventoryData || !stateName) return <></>;

    for (let i = 0; i < filteredYears.length; i++) {
      const yearCode = filteredYears[i];
      const plateDetails = stateInventoryData[yearCode];
      const plateCondition = plateDetails?.condition;
      if (!plateCondition) continue;

      const inventoryItem: InventoryItem = {
        yearCode: yearCode,
        stateCode: stateCode,
        stateName: stateName,
        condition: plateCondition,
        image: plateDetails?.image,
      };
      inventoryItems.push(inventoryItem);
    }
  }

  return (
    <div className="InventoryImagesPanel" style={style}>
      <div className="grid-container">
        {inventoryItems.map((inventoryItem, key) => (
          <div className="grid-item" key={key}>
            <img
              src={inventoryItem.image || NotFoundImage}
              // alt={`${inventoryItem.stateCode}-${inventoryItem.yearCode}`}
              width="100%"
              onError={(e) => {
                e.currentTarget.onerror = null; // prevents looping
                e.currentTarget.src = NotFoundImage;
              }}
            />
            <div>
              <div>
                <span>{inventoryItem.stateName}</span>
              </div>
              <div>
                <span>{inventoryItem.yearCode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryImagesPanel;
