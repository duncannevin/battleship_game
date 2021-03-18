function relations(models) {
    const { Board, Play, Ship } = models;

    Board.hasMany(Play, { foreignKey: { allowNull: false } });
    Play.belongsTo(Board, { foreignKey: { allowNull: false } });

    Board.hasMany(Ship);
    Ship.belongsTo(Board);

    Board.hasOne(Board, { as: 'Opponent' });
}

module.exports = relations;
