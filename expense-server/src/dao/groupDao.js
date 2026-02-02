const group = require('../model/group')

const groupDao = {
    createGroup: async (data) => {
        const newGroup = new group(data);
        return await newGroup.save();
    },
    updateGroup: async (groupId, data) => {
        const { name, description, thumbnail, adminEmail, paymentStatus } = data;
        return await group.findByIdAndUpdate(groupId, {
            name, description, thumbnail, adminEmail, paymentStatus,
        }, { new: true });
    },



    addMembers: async (groupId, ...membersEmail) => {
        return await group.findByIdAndUpdate(groupId, {
            $addToSet: { membersEmail: { $each: membersEmail } }
        }, { new: true });
    },


    removeMembers: async (groupId, ...membersEmail) => {
        return await group.findByIdAndUpdate(groupId, {
            $pull: { membersEmail: { $in: membersEmail } }
        }, { new: true });
    },


    getGroupByEmail: async (email) => {
        return await group.find({ membersEmail: email });
    },


    getGroupByStatus: async (status) => {
        return await group.find({ 'paymentStatus.isPaid': status });
    },

    /**
     * We will only return when was the last time group was settled to begin with.
     * in Future, we can move this to separate entity
     * @param {} groupId 
     */
    getAuditLog: async (groupId) => {
        return await group.findById(groupId, { paymentStatus: 1, createdAt: 1 });
    },

};

module.exports = groupDao;