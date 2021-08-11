import HandlerCoordBlock from '../HandlerCoordBlock';

const handler = new HandlerCoordBlock();

test('Получение отформатированного значения, введенного пользователем 51.50851, -0.12572', () => {
  const expected = {
    latitude: 51.50851,
    longitude: -0.12572,
  };
  const result = handler.checkInputText('51.50851, -0.12572');
  expect(result).toEqual(expected);
});

test('Получение отформатированного значения, введенного пользователем 51.50851,-0.12572', () => {
  const expected = {
    latitude: 51.50851,
    longitude: -0.12572,
  };
  const result = handler.checkInputText('51.50851,-0.12572');
  expect(result).toEqual(expected);
});

test('Получение отформатированного значения, введенного пользователем [51.50851, -0.12572]', () => {
  const expected = {
    latitude: 51.50851,
    longitude: -0.12572,
  };
  const result = handler.checkInputText('[51.50851, -0.12572]');
  expect(result).toEqual(expected);
});

test('Получение неправильного значения, введенного пользователем', () => {
  const result = handler.checkInputText('[51.50851вв, -0.12572]');
  expect(result).toBeFalsy();
});

test('Получение неправильного значения, введенного пользователем', () => {
  const result = handler.checkInputText('51.50851вв');
  expect(result).toBeFalsy();
});
