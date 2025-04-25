export const selectUserFields = () => {
    return {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: {
            select: {
                name: true,
                description: true,
            },
        },
    };
};
