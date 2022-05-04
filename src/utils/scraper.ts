import axios from 'axios'

async function isValidId(type: string, id: string) {
    const errorMessage = type === 'group'
        ? 'No group could be retrieved for the given URL.' : 'The specified profile could not be found.'

    let res = await axios.get('https://steamcommunity.com/' + (type === 'group' ? 'groups' : 'id') + '/' + id)

    if (res.status !== 200) {
        return false
    }

    return (res.data as string).search(errorMessage) !== -1
}

export { isValidId }