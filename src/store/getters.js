export default {
    getTags: state=> state.tags,
    getDatabase: state=> state.db,
    getUserName: state=> state.user ? state.user.name : '',
    getAvatar: state=> state.user ? state.user.avatar : '',
    getTagsNames: state=> state.tags.map(item=> item.name)
};