import { Storage } from 'common/storage';

export default angular.module('scores', [])
  .directive('scores', scores)
  .service('storage', ['$window',Storage])

function scores () {
  return {
    restrict: 'E',
    template: require('scores/scores.html'),
    controller: ScoresController,
    controllerAs: 'board'
  }
}

class ScoresController {

  constructor($scope, storage) {
    this.scores = storage.getItem('SCORES') || [];
    this.storage = storage;
    console.log(`storage = ${ JSON.stringify(storage, null, 4) }`);

    $scope.$on('game:over', this._updateScore.bind(this));
  }

  _updateScore(evt, payload) {
    if(payload.player) {
      this.scores.push({
        player: payload.player,
        score: payload.score
      })
    }

    this.storage.setItem('SCORES', this.scores);
  }
}

ScoresController.$inject=['$scope','storage'];
