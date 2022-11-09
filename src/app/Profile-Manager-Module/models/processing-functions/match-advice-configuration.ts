import {AlternativeMatchWithAmountConfiguration} from './alternative-match-with-amount-configuration';
import {RemoteConfiguration} from './remote-configuration';

export class MatchAdviceConfiguration {
  matchWithAmount = true;
  matchWithCustomerOrSupplierInformation = false;
  matchWithOther = false;
  alternativeMatchWithAmountConfiguration:
      AlternativeMatchWithAmountConfiguration =
          new AlternativeMatchWithAmountConfiguration();
  matchWithCustomerOrSupplierInformationConfigurations: RemoteConfiguration[] =
      [];
  matchWithOtherTermsConfigurations: RemoteConfiguration[] = [];
  toleranceGroupName?: string;
}