function relations(models) {
    const { Board, Play, Ship } = models;

    Board.hasMany(Play);
    Play.belongsTo(Board);

    Board.hasMany(Ship);
    Ship.belongsTo(Board);
}

module.exports = relations;
