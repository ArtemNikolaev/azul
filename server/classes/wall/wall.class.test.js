/*
  constructor
* класс должен создаваться
* пустой конструктор создаёт легкий уровень сложный
* правильное создание лёгкий уровень сложности
* правильное создание сложный уровень сложности
* неправильный уровень сложности генерирует ошибку
*
* canBePlaced
* всегда должен быть цвет
* всегда должна быть строка
* легкий: колонка всегда undefined, иначе исключение
* сложный: колонка всегда number, иначе исключение
* сложный: если колонка занята, мессадж на клиент об ошибке
* правильные варианты тру для легкого
* несколько edge case для сложного
*
* place
* всегда вызывает canBePlaced
* всегда возвращает правильный подсчёт очков
*
* rules
* легкий: col это number
* сложный: col это массив чисел
* сложный: place должен удалять значение по горизонтали и вертикали
*
*
* у легкого уровня сложности готовые rules
* у сложного уровня сложности рулс не готовые
*
* для легкой игры достаточно только строки для заполнения
* неправильный тайл возвращает ошибку и генерирует исключение
*
* для сложной игры колонка должна быть указана всегда
* неуказанная колонка генерирует исключение
*
* */
import Wall from './wall.class';

describe('server/classes/wall/wall.class.js', () => {
  describe('constructor', () => {
    describe('should create easy level wall if there is no args', () => {
      const wallObj = new Wall();

      const rules = [
        [
          0,1,2,3,4 // value as column
        ], //row as index
        [
          1,2,3,4,0 // value as column
        ], //row as index
        [
          2,3,4,0,1 // value as column
        ], //row as index
        [
          3,4,0,1,2 // value as column
        ], //row as index
        [
          4,0,1,2,3 // value as column
        ], //row as index
        [
          0,1,2,3,4 // value as column
        ], //row as index
      ]; // color  as index
      const wall = [new Array(5),new Array(5),new Array(5),new Array(5)];

      expect(wallObj).toEqual(wall);
      expect(rules).toEqual(rules);

    });
  });
});