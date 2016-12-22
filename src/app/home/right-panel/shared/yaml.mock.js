export const MOCK_DATA = {
    tiers:{
        name: 'WEB TIER',
            type:'',
            replicas:1,
            containers:{
            name:'new_image',
                image: null,
                environment:{'':''},
            ports:[
                {
                    containerPort:'',
                    service:'internal',
                    servicePort:'',
                    hostPort:8080,
                    name:'',
                    protocol:'',
                    url:[]
                },
                {
                    containerPort:'',
                    service:'internal',
                    servicePort:'',
                    hostPort:8080,
                    name:'',
                    protocol:'',
                    url:[]
                }
            ],
                volumes:[
                {
                    containerVolume:'',
                    readOnly:false,
                    minSize:'',
                    maxSize:''
                },
                {
                    containerVolume:'',
                    readOnly:false,
                    minSize:'',
                    maxSize:''
                }

            ]
        }
    }
};