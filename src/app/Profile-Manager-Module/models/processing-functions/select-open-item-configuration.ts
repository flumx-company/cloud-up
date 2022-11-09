import {RemoteConfiguration} from './remote-configuration';

export class SelectOpenItemConfiguration {
  id?: number;
  usePreviousSelectedOpenItems = true;
  useCharacteristicIdentificationResults = false;
  useOptimizationResults = false;
  useFilter = false;
  characteristicIdentificationConfigurations: RemoteConfiguration[] = [];
  optimizationConfigurations: RemoteConfiguration[] = [];
  filterConfigurations: RemoteConfiguration[] = [];
}