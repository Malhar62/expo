import axios from 'axios'



export async function callApi(url){
	console.log(url)
	const response=await axios.get(url);

	if(response.status==200){
		return response.data;
	}else{
		return null;
	}
}