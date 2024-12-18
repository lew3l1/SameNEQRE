app.get('/api/user/favorites', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json(user.favorites);
});
