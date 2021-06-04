import request from "@/axios/index"

export const commonInterface = {
    testInterface(arrData) {
        return request({
            url: '....',
            method: 'POST',
            data: arrData
        })
    }
}