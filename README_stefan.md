
# Start a local docker test instance
    sudo docker run --name some-nginx -v $(pwd):/usr/share/nginx/html:ro -p 80:80 -d nginx

# Playing with DataCollection.js
## Filter by categories (aka "tags")
The following simulates fitering by organizational units

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

## Sorting by multiple fields (using a comparision function)
DataCollection.js only allows to sort by one field. I did an extension which allows to pass a comparision function.

    function cmdSortByLastNameAndAge(a, b) {
        function cmp(a, b) {
            if(a==b) return 0;
            return a > b ? 1 : -1;
        }
        return cmp(a.last_name, b.last_name) || cmp(b.age, a.age);
    }
    var charDC = new DataCollection(characters);
    
    var sorted = charDC.query().orderByFunc( cmdSortByLastNameAndAge).values();

## Grouping by a field
This is my second extention. It allows to group a query by a key. 

    var grouped = charDC.query().sort('age', true).groupBy('location').values();

The result contains a record for each group such as

    {
        grouping_field: grouping_value,
        records: [ all_records_within_the_group]
    }

If a **sort** is applied before the grouping, it is preserved within the groups.

