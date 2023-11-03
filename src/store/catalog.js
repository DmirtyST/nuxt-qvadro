import {catalogItem1} from './catalogProducts/catalogItem1';
import {catalogItem2} from './catalogProducts/catalogItem2';
import {catalogItem3} from './catalogProducts/catalogItem3';
import {catalogItem4} from './catalogProducts/catalogItem4';
import {catalogItem5} from './catalogProducts/catalogItem5';
import {catalogItem6} from './catalogProducts/catalogItem6';


export const useCatalogStore = defineStore('cotalog', () => {
    
   const cotalogData = ref([
      catalogItem1,
      catalogItem2,
      catalogItem3,
      catalogItem4,
      catalogItem5,
      catalogItem6,
  ])
    

    return {cotalogData}
})