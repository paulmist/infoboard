var BigTextTest = {};
BigTextTest.tolerance = 6;

// If the lines of text are blocks, testing their width will tell us nothing.
BigTextTest.init = function()
{
  return this.css('float', 'left');
};

BigTextTest.linesTest = function(selector, expectedWidth, options)
{
  var tolerance = BigTextTest.tolerance,
    minWidth = expectedWidth - tolerance,
    maxWidth = expectedWidth + tolerance,
    options = options || {},
    $test = $(selector),
    $lines = $test.find(options.childSelector || '> *'),
    startingFontSize = parseInt($lines.eq(0).css('font-size'), 10);

  BigTextTest.init.call($lines);

  $lines.each(function(j)
  {
    var width = $(this).width();
    ok(!(minWidth < width && width < maxWidth), 'Line ' + j + ' is not max width (' + minWidth + ' < ' + width + ' < ' + maxWidth + ')');
  });

  $test.bigtext(options);

  ok('Class added.', $test.is('.bigtext'));

  $lines.each(function(j)
  {
    var $t = $(this),
      width = $t.width(),
      height = $t.height(),
      fontSize = parseFloat($t.css('font-size')),
      $heightElement = $('<div>A</div>').css({
          'font-size': fontSize,
          position: 'absolute'
        }).appendTo(document.body),
      expectedHeight = $heightElement.height(),
      minHeight = expectedHeight - tolerance,
      maxHeight = expectedHeight + tolerance;

    ok('Line ' + j + ' class added.', $t.is('.bigtext-line' + j));
    if($t.hasClass(BigText.EXEMPT_CLASS)) {
      // must be added to document to get font-size
      var defaultDocumentFontSize = parseInt($('<div/>').appendTo(document.body).css('font-size'), 10);
      equal(defaultDocumentFontSize, fontSize, 'Line ' + j + ' Font size must be unchanged');
    } else {
      ok(fontSize > startingFontSize, 'Line ' + j + ' Font size must be larger than the starting pixel size');
      ok(minWidth < width && width < maxWidth, 'Line ' + j + ' width should be about ' + expectedWidth + 'px (' + width + ')');
      ok(minHeight < height && height < maxHeight, 'Line ' + j + ' height should be about ' + expectedHeight + 'px (' + minHeight + ' < ' + height + ' < ' + maxHeight + ')');
    }

    $heightElement.remove();
  });
};

test('testExists', function()
{
  ok(!!BigText);
  ok(!!$.fn.bigtext);
});

test('testStyleInjection', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is a simple test.</div></div>');
  $('#test').bigtext();

  equal($('#' + BigText.getStyleId('test')).length, 1, 'Test to make sure the style tag was inserted.');
});

test('testDoubleStyleInjection', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is a simple test.</div></div>');
  $('#test').bigtext().bigtext();

  // FIXME this jQuery result won't return more than one element.
  ok($('#' + BigText.getStyleId('test')).length === 1, 'Test to make sure the style tag wasn\'t inserted twice.');
});


test('testCleanup', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is a simple test.</div></div>');
  $('#test').bigtext();

  ok($('.bigtext-cloned').length === 0, 'Clone should be deleted.');
});

test('testOneLine', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is a single line.</div></div>');

  BigTextTest.linesTest('#test', 600);
});

test('testTwoLines', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is</div><div>a longer second line</div></div>');

  BigTextTest.linesTest('#test', 600);
});

test('testThreeLines', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is</div><div>a longer second line</div><div>An even longer third line.</div></div>');

  BigTextTest.linesTest('#test', 600);
});

test('testThreeLinesWithAList', function()
{
  $('#qunit-fixture').append('<ol id="test" style="width:600px"><li>This is</li><li>a longer second line</li><li>An even longer third line.</li></ol>');

  BigTextTest.linesTest('#test', 600);
});

test('testTwoElements', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is</div><div>a longer second line</div></div><div id="test2" style="width:400px"><div>This is</div><div>a longer second line</div></div>');

  BigTextTest.linesTest('#test', 600);
  BigTextTest.linesTest('#test2', 400);

  notEqual($('#test').find('> div').eq(0).css('font-size'),
            $('#test2').find('> div').eq(0).css('font-size'),
            'Line 1 of each is a different size.');

  notEqual($('#test').find('> div').eq(1).css('font-size'),
            $('#test2').find('> div').eq(1).css('font-size'),
            'Line 2 of each is a different size.');
});

test('testPercentageWidth', function()
{
  $('#qunit-fixture').append('<div style="width: 600px"><div id="test" style="width: 50%"><div>This is a single line.</div></div></div>');

  BigTextTest.linesTest('#test', 300);
});

test('testNoChildren', function()
{
  $('#qunit-fixture').append('<div id="test" style="width: 600px">This is a single line.</div>');

  BigTextTest.linesTest('#test', 300);
});

test('testMaxFontSize', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>1</div></div>');
  $('#test').bigtext();

  equal(BigText.DEFAULT_MAX_FONT_SIZE_PX + 'px',
    $('#test > div').css('font-size'),
    'Font size should equal the maximum.');
});

test('testUnbrokenSingleWord', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:300px"><div>This</div></div>');
  var startingFontSize = parseInt($('#test > div').css('font-size'), 10);
  $('#test').bigtext();

  ok(parseInt($('#test > div').css('font-size'), 10) > startingFontSize, 'Font size must be larger than the starting pixel size.');
});

test('testTwoLinesButOneExempt', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:400px"><div>This is</div><div class="bigtext-exempt">a longer second line</div></div>');

  BigTextTest.linesTest('#test', 400);
});

test('testExemptLineWithChild', function()
{
  var defaultExemptLineFontSize,
    childFontSize,
    $test = $('#test'),
    $exempt;

  $('#qunit-fixture').append('<div id="test" style="width:400px"><div>This is</div><div class="bigtext-exempt">a longer <span>second</span> line</div></div>');
  $exempt = $test.find('.bigtext-exempt');

  defaultExemptLineFontSize = $exempt.css('font-size');
  $test.bigtext();
  childFontSize = $exempt.css('font-size');

  equal(defaultExemptLineFontSize, childFontSize, 'Exempt line\'s child font size must be unchanged');
});

test('testIdCssSelectorStyle', function()
{
  $('#qunit-fixture').append('<style>#test { width: 600px; font-weight: bold; }</style><div id="test"><div>This is a single line.</div></div>');

  BigTextTest.linesTest('#test', 600);
});

test('testMaxWidth', function()
{
  $('#qunit-fixture').append('<div id="test" style="max-width:600px"><div>This is a single line.</div></div>');

  BigTextTest.linesTest('#test', 600);
});

test('testNoConflict', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is a single line.</div></div>');

  var BT = BigText.noConflict();
  $.fn.bt = BT.jQueryMethod;

  $('#test').bt();

  var defaultDocumentFontSize = $('<div/>').appendTo(document.body).css('font-size'),
    childFontSize = $('#test > div').css('font-size');

  notEqual(defaultDocumentFontSize, childFontSize, 'Font size must not equal the default.');
});

test('testMinFontSize', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div>This is a super long line that will probably be too long for this single line. This is a super long line that will probably be too long for this single line.</div></div>');
  $('#test').bigtext({
    minfontsize: 16
  });

  equal('16px', $('#test > div').css('font-size'), 'Font size should equal the minimum.');
  equal('normal', $('#test > div').css('white-space'), 'When minimum is set, word wrap should re-enable.');
});

test('testChildClassReplace', function()
{
  $('#qunit-fixture').append('<div id="test" style="width:600px"><div class="testbigtext-line1">This is a single line.</div></div>');

  BigTextTest.linesTest('#test', 600);
  ok($('#test > div').hasClass('testbigtext-line1'), 'First line should still have testbigtext-line1 class');
  ok(!$('#test > div').hasClass('test'), 'First line should not have test class');
});

test('testTextTransform', function()
{
  $('#qunit-fixture').append('<div style="text-transform: uppercase"><div id="test" style="width:600px"><div class="testbigtext-line1">This is a single line.</div></div></div>');

  BigTextTest.linesTest('#test', 600);
});
