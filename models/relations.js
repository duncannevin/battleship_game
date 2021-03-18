function relations(models) {
    const { Board, Play, Ship } = models;

    Board.hasMany(Play, { foreignKey: { allowNull: false } });
    Play.belongsTo(Board, { foreignKey: { allowNull: false } });

    Board.hasMany(Ship);
    Ship.belongsTo(Board);

    Board.hasOne(Board, { as: 'Opponent' });
    // Board.belongsTo(Board, { as: 'Opponent', foreignKey: { allowNull: false } });
}

module.exports = relations;
