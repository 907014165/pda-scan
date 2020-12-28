import send from '../request/index.js'

// const baseUrl = '/api'
const baseUrl = 'http://8.134.37.133:9983'
const api = {
    login:{
        post:({userName = '',password = ''}={})=> send({
            method:'post',
            url:`${baseUrl}/system/accounts/login`,
            data:{
                userName,
                password,
            }
        })
    },
    parcel:{
        updateParcelStatus:{
            post:({courierNo = ''} = {}) => send({
                method:'post',
                url:`${baseUrl}/system/parcel/updateParcelStatus`,
                data:{
                    courierNo,
                }
            })
        },
        confirmParcelBelong:{
            post:({parcelId = ''} = {}) => send({
                method:'post',
                url:`${baseUrl}/system/parcel/confirmParcelBelong`,
                data:{
                    parcelId,
                }
            })
        }
    },
    packing:{
        selectCustomPacking:{
            get:({courierNo = ''}={})=> send({
                method:'get',
                url:`${baseUrl}/system/packing/selectCustomPacking`,
                data:{
                    courierNo,
                }
            })
        },
        getAllConnectionPrint:{
            get:()=>send({
                method:"get",
                url:`${baseUrl}/system/packing/getAllConnectionPrint`
            })
        },
        updateParcelStatus:{
            post:({list = [],deviceNo=''}={})=> send({
                method:'post',
                url:`${baseUrl}/system/packing/updateParcelStatus`,
                data:{
                    deviceNo,
                    parcelUserDTOList:list
                },
            })
        },
        pickUpPacking:{
            put:({packingNo=''}={})=>send({
                method:'put',
                url:`${baseUrl}/system/packing/pickUpPacking/${packingNo}`,
            })
        }
    },
    container:{
        changeParcelStatus:{
            post:({containerId = '',packingNo = ''}={})=> send({
                method:'post',
                url:`${baseUrl}/system/container/changeParcelStatus`,
                data:{
                    containerId,
                    packingNo,
                }
            }),
			put:({containerId}={})=> send({
				method:'put',
				url:`${baseUrl}/system/container/changeContainerStatus/${containerId}`
			})
        },
        selectCurrentContainer:{
            get:() => send({
                method:'get',
                url:`${baseUrl}/system/container/selectCurrentContainer`
            })
        },
        changeContainerStatus:{
            post:({containerId = ''}={})=> send({
                method:'post',
                url:`${baseUrl}/system/container/changeContainerStatus/${containerId}`,
                data:{
                    containerId,
                }
            })
        }
    }
}

export default api;