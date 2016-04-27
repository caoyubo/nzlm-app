/**
 * Created by marlowe on 2016/3/16.
 */
detail.filter('trustHtml', function ($sce) {
  return function (input) {
    return $sce.trustAsHtml(input);
  }
});

