import Mock from 'mockjs'

let hotel = []
const hotelCount = 200

for (let i = 1; i < hotelCount; i++) {
    hotel.push(Mock.mock({
        // id: Mock.Random.guid(),
        // id: Mock.Random.natural(1,200),
        'id|+1': i,
        HotelName: Mock.Random.cword( 3, 5 ),
        HotelName_En: Mock.Random.word( 3, 5 ),
        FrontPhone: /^1[0-9]{10}$/,
        Address: Mock.mock('@county(true)'),
        'Star|1':['一星级','二星级','三星级','四星级','五星级','六星级'],
        PersonName: Mock.Random.cname(),
        PurchasingName: Mock.Random.cname(),
        PayMode:''
    }))
}

export const hotelbase = hotel