var characters = [{
    id: 1,
    first_name: 'Jon',
    last_name: 'Snow',
    gender: 'm',
    age: 14,
    location: 'Berlin'
}, {
    id: 2,
    first_name: 'Eddard',
    last_name: 'Stark',
    gender: 'm',
    age: 35,
    location: 'Winterfell'
}, {
    id: 3,
    first_name: 'Catelyn',
    last_name: 'Stark',
    gender: 'f',
    age: 33,
    location: 'Winterfell'
}, {
    id: 4,
    first_name: 'Roose',
    last_name: 'Bolton',
    gender: 'm',
    age: 40,
    location: 'Dreadfort'
}, {
    id: 5,
    first_name: 'Ramsay',
    last_name: 'Armstrong',
    gender: 'm',
    age: 15,
    location: 'Dreadfort'
}];


// [
//   {
//     first_name: 'Jon',
//     records: [
//       {
//           id: 1,
//           first_name: 'Jon',
//           last_name: 'Snow',
//           gender: 'm',
//           age: 14,
//           location: 'Winterfell'
//       },
//       {
//           id: 1,
//           first_name: 'Jon',
//           last_name: 'Michael',
//           gender: 'm',
//           age: 14,
//           location: 'Berlin'
//       },
//     ]
//   }
// ]
// function cmp(a, b) {
//     // if(a==b) return 0;
//     // return a>b;
//     var res;
//     if (a == b) {
//         res = 0;
//     } else {
//         res = a > b ? 1 : -1;
//     }
//     console.log(a + " " + b + " " + res);
//     return res;
// }

function cmdSortByLastNameAndAge(a, b) {
    function cmp(a, b) {
        if(a==b) return 0;
        return a > b ? 1 : -1;
    }
    return cmp(a.last_name, b.last_name) || cmp(b.age, a.age);
}

var charDC = new DataCollection(characters);

// var filtered = charDC.query().filter({first_name__in: ['Catelyn', 'Eddard']});
var sorted = charDC.query().orderByFunc( cmdSortByLastNameAndAge).values();

var grouped = charDC.query().sort('age', true).groupBy('location').values();

//================

var dc = new DataCollection();
    dc.load([{
        valid_for_ou: { wmsb:1, cc:1, ib:1},
    }, {
        valid_for_ou: { wmsb:1, ib:1},
    }, {
        valid_for_ou: {},
    }, {
        valid_for_ou: { wmsb:1},
    }]);
    var res = dc.query().filter({
        valid_for_ou__wmsb__gt: 0,
        valid_for_ou__ib__gt: 0,
    }).values();