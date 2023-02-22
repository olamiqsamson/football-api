const Teams = require('../models/team')

const getAllTeams = async (req, res) => {
    const {name ,location, uclwinner, sort, select, numberFilters} = req.query
    console.log(req.query)
    let queryObject = {}
    let result = Teams.find(queryObject)
    if (name) {
        queryObject.name = {$regex: name, $options: 'i' }
    }
        if (location) {
            queryObject.location = { $regex: location, $options: 'i'}
        }
        if (uclwinner){
            queryObject.uclwinner = uclwinner === "true" ? true : false
        }
        if (numberFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte'
            }
            const regEx = /\b(<|>|>=|<=|=)\b/g;
            //ratings>3.0
            let filters = numberFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
            )
            const options = ['rating']
            filters = filters.split(',').forEach((item) => {
                const [search, operator, value] = item.split('-')
                if(options.includes(search)) {
                    queryObject[search] = { [operator]: Number(value) }
                }
            })
        }

        //sorting
        if (sort) {
            const sortList = sort.split(',').join(' ')
            result = result.sort(sortList)
        }
        //selecting
        if (select) {
            const selectList = select.split(',').join(' ')
            result = result.select(selectList)
        }
        //limit
          const limit = Number(req.query.limit)
          result = result.limit(limit)

    result = result.find(queryObject)
    const teams = await result
    res.status(200).json({ noOfTeams: teams.length, teams})
}

module.exports = getAllTeams