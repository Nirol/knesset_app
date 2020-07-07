export default function makeKalfiData(props,display) { 
  const jsonInput = props.chartDataInput 
   let meta_arr = ''
   let data_arr = ''
  if (display ==='All'){
    meta_arr = jsonInput.kalfi_meta
    data_arr = jsonInput.kalfi_data
    
  }
  else if (display ==='Top'){
    meta_arr = jsonInput.meta_top
    data_arr = jsonInput.data_top

  }

  else {
    meta_arr = jsonInput.meta_bot
    data_arr = jsonInput.data_bot

  }
 
 

let ans = [] 
const kalfisLength = Object.keys(data_arr).length
for (let i = 0; i < kalfisLength; i++) {
  const temp_arr_data = data_arr[i]
  const temp_arr_meta = meta_arr[i]

const finalObj =   Object.assign(temp_arr_data, temp_arr_meta)
ans.push(finalObj) 
} 


return ans;

}

