import Mock from 'mockjs'

let imagesInfos = []
const Count = 200

for (let i = 1; i < Count; i++) {
    imagesInfos.push(Mock.mock({
       id: Mock.Random.guid(),
       hotelName:  Mock.Random.cword( 3, 5 ),
       uploadDate: Mock.Random.datetime(),
       upPersonName: Mock.Random.cname()
    }))
}

export const imagesInfo = imagesInfos