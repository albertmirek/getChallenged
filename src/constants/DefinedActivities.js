import Icons from './Icons';
export default[
    {
        usage:"activity",
        name:"Run",
        area:"Sport",
        iconType: Icons.running.type,
        iconName: Icons.running.name,
        units:[
            {label: 'Kilometres', value:'km'},
        ]
    },
    {
        usage:"activity",
        name:"Ride",
        area:"Sport",
        iconType: Icons.cycling.type,
        iconType: Icons.cycling.name,
        units:[
            {label: 'Kilometres', value:'km'},
        ]
    },
    {
        usage:"activity",
        name:"Walk",
        area:"Sport",
        iconType: Icons.cycling.type,
        iconType: Icons.cycling.name,
        units:[
            {label:'Steps', value:'steps'},
            {label:'Kilometres', value:'km'}
        ]
    },
    {
        usage:'goalType',
        name:'Numeric',
    },
    {
        usage:'goalType',
        name:'Binary'
    },
    {
        usage: 'repetition',
        values:[
            {label:'Daily', value:'daily'},
            {label:'Weekly', value:'weekly'},
            {label:'Monthly', value:'monthly'}
        ]
    }
]
