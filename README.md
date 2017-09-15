[![Build Status](https://travis-ci.org/ivanblazevic/dynamic-filter.svg?branch=master)](https://travis-ci.org/ivanblazevic/dynamic-filter)[![Coverage Status](https://coveralls.io/repos/github/ivanblazevic/dynamic-filter/badge.svg?branch=master)](https://coveralls.io/github/ivanblazevic/dynamic-filter?branch=master)[![devDependencies Status](https://david-dm.org/ivanblazevic/dynamic-filter/dev-status.svg)](https://david-dm.org/ivanblazevic/dynamic-filter?type=dev)

# Dynamic Filter

Dynamic filter generates JSON key-array object as result which later can be used for querying backend.

![alt text](data:image/png;base64,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GWJ16267E6W75foPoF+/ftayZUtbtWqVffLJJ67MAwYMKPER6maOrgHq4vTVV1/ZKaec4tZr+fjx461+/frujnnwOqC8//73v23BggU2cOBAt19dO7p06RLf96effuquIz169HCtero2KWmfrVq1cq+Vp1GjRq7seiYhUBUFqsL1Yvbs2fbZZ59ZgwYNbJ999nHXhURrBWBNmzZ1f8+qV6gusP/++7trgPLOmjXL1SvUSq/6h3r1qI6hG8hqRdPNKdVNRo8ebbou7bfffta5c+fEw/AegRojkK1rg4IwH4j16dUgsmfimLEoO+zTs2E8+MpWEKbyReqaqB2o0qTAa/LkyXrrki5mqiTpQujTypUr7eijj7bnnnvO5X/00UftmGOOsbVr19r8+fNdBUwXzFdffdWNF1HF6IQTTjDlU4XnV7/6ld16661+d/b73//e/vjHP9pll13mKl2ff/65/e53v4uvv+iii2zYsGGugqVui4ceeqgL9uIZeIFADRDQneGnnnrK2rZtW+JsfRCmluTKklR5uvzyy003X3xSkPSb3/zG3ZhRBezYY4+1Bx980F0nTj75ZFdJ8nkfeeQRd4049dRTXYVKy++77z678MILbcaMGfbhhx/aUUcdZR9//LHbREGerivXXHONq6idffbZ7viPP/64W6/xKb/+9a/det0ouuGGG+y8885z49KUQeW48cYb3TIFYrfddpvbnwI5EgJVUaCyXy9efvllVy/Q3/BLL71kRxxxhH3xxRelqH/44Qc7//zzTX/Dy5cvt0svvbTEtUI3hP/85z+77VS/UH3inHPOcYGXhlXoWqC/dQ1jUJ1FdZG5c+eWOg4LEKgpAtm8NijI0aN1y3rWo2vqPemyad+jaz1r1bJuiRaxbB0vcouY7hrpTpP6d/fuve2H0/T6jDPOKHGBHDdunLVo0cJVChX96gKpu9yq4OhO9Lnnnuu6Jj7wwAPuXK+88krXAqbuBcqvO1iHH364C+b69Onj8vz444/ubrbujAXHiejCq/3+61//MrW8Kemi+t5779muu+7q3vMPAjVFwF9ANZ5KLWMVFYQp8NG1IjHp71XXgubNm7v1unGi1nIlvdbNHt3Uufbaa901RgGQgraxY8e6ylNwf/q7V2VNd6+nTp1qDz30kGl82s477+yy3XvvvS6wUivbiBEjTMGdrh3NmjVz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BBBAAAEE0hMgEEvPi9wIIIAAAggggAACCCCAQGQBArHIhOwAAQQQQAABBBBAAAEEEEhPgEAsPS9yI4AAAggggAACCCCAAAKRBQjEIhOyAwQQQAABBBBAAAEEEEAgPYGMBGJz5861sWPH2tSpU624uDi9EqSYe/PmzbZy5coUc5fOpnJt3Lix9AqWIIBA1gXWrl1rzz77bEauD4sXL7aXXnop62XmAAgggAACCCCAQDYFIgViK1assHPOOccOPfRQu+KKK+zYY4+1gw8+2D788MOMl1lB3t57721bt24Nte+nn37azjzzzFDbshECCEQT0LXihhtusKKiomg7im09Y8YMu/322yPvhx0ggAACCCCAAAIVKZAf5eB/+tOfbMuWLfbxxx9bixYtrLCw0IYNG2aXXXaZvfPOO9a6desou2dbBBCIKPDBBx+YWpDKSo0bN7YjjzzSatWqVVaWyMuXL19u3377rdvPV199ZV27drUOHTq49wsWLLAJEyZYu3btrE+fPlanTp348b7//nubPHmyNWjQwAYOHGgq68KFC+Mt7+PHj7cuXbpYy5Yt49vwAgEEEEAAAQQQqCoCkQKxTz/91K655hoXhOmE69evb1deeaV99NFHNmXKFNuwYYOrNB100EFxj9WrV7tujPvuu6+rZDVr1iwezG233XZ24IEHusrWmDFjrEmTJnbAAQe4/fodKNh79913TZW7AQMG2I477uhXuf28//77Nm3aNGvfvr1rqVMljoRATRXo1q2bXX/99UmDMQU2f//737MahMn966+/tgceeMB9BGrJUsv0qaeeamqlvvfee61v3742e/ZsF4Q9/vjj1rx5c9fipe6HagVX8HXttdfaiBEj7IsvvrCnnnrK1q9fb7oRdPnll7trRE39fDlvBBBAAAEEEKi6ArViXYXC9fWLnfNRRx3l7kYPHTrU3eVOZNAd7eOOO85effVV6927t1utStTDDz/sui9eeOGFrhVN3ZZ69Ohho0ePtsMOO8y+/PJL69Wrl7tTvvvuu9tDDz1kfl8777yztWrVyvLz890+br75ZjvxxBPd2JMLLrjA5s+f7wK0iRMn2o8//mjPPPOMu9uuCt5rr71mL7zwQmIxeY9AtRZQkHPWWWeVCMZ8EKa/r1ykOXPmuG7Lav3SzRHdLDnttNPsxRdfdK1aallX92bdfLnpppts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39rbb79dIp9/c+yxx9qdd95po0aNsiuuuML69OljL7zwgl8dfz7hhBNs2rRp9uijj9qgQdt8lixZYldffbV9/PHH8eBNwcf+++9vN998s7Vt29YFJAcccICdeOKJduWVV8b3pxfLli1zea+99lo788wz7fTTT7eJEyeWyOPfXHTRRXb55Zf7t/Hn0aNHm9YlS0cccYTdc8899vDDD9tLL71k77//vsv2m9/8xgWr999/f4nN/vCHP9jrr79eYlnwzaWXXmrnnXee9e3bN7i4xOvHHnvMBg4caA888IA99NBDJdYpQO7cubPpOAceeGCJdbxBAAEEEEAAAQQQqBiBCgnEBg9s5wKQXXo3t2ZN69rKVdtaCoIE/3vtWPdWLVGdOja0047r5oK3P9463jYW/RSQ3Pe3SS74Uktauzb17fADtrObr+prQ++eYLPn/RQ0Bfet1//+fLGNfHdu4mJbsqzsVofEzEuXb7Df3vh5fPGl5+1kS5cX2j9fmRlf5l+sXltkt95XMujUusQWweH/nG5ffrvMbaZz6tiuoZ1/Rk8777Se9uDw7/3uKvz5wgsvtNNOO82VQ61D8+bNc0GQgpann346Xj4FTwpAElOTJk3iixTEKRCaO3euderUKb58+vTpNnv27BItbQq4FJSodWj48OG25557uvyfffaZXXPNNfZf//Vf9vLLL7sATQHRW2+9Zb///e9L7EPBoVqPjjzyyPixTj75ZDvrrLPi7/2Lli1b+pdJn5955hlr0KBBiXXBcyuxoow3CpAUbCl99dVXLsh88skn4wFts2bN4lveeOONtvvuu8ff+xcKtHzSa9n4tHr1anv++eftkksusTfffNO6dOniV/GMAAIIIIAAAgggUEECOQ/E1C1wYL+29uhTk+28M3rZwD3b2BvvzSt1+gpyfJofa936ftoqu+/mAXbwoA4lAqiVq4tiwc+2vIuXFrpWtpv/sKf94piudtdD3/pdlHpevabIZs0tO1ArtUGSBQqiFiz+qeVNAeL6WItdcJnfTN0wUzmeAjZ/PtpW5zT608amlsLKlBo3bmwdO3aMF0kB1LnnnmsKFNQdT93plBSU7LjjjvF8yV7Ur1/fevfu7YIEBXg+KYhSK9cHH3zgF9m//vUv++GHH1wLUrdu3eLL9913X3vwwQftpJNOsldeecU9H3/88aZA6ZtvvrHddtstnlfByODBg6158+bxZa1atSq3nPHMgRe9evWyRo2St64Gsv3sS7Ug+lbERYsWubzybN++fXy7devWudcKssrzlH3ws9FrBXsjRoywCRMmEIjFVXmBAAIIIIAAAghUnEDJQVY5KMdeu7Vy43HGfbPcPv9yiQ3q3y6lo66KBVzjY9v03fXnWyg0ruqDjxfa7ru0iI0BKmMgWEpHrDyZmjSua4uW/BTwVZ6SlSzJihUrbLvttosHYSXXlv1OgZtar954440SmfT+8MMPLzF+a+TIkTZkyBALBmF+o5133tn69etnY8aMcYsUfKn1R4GXT+qWOG7cODvuuOP8ohrxvHLlSue4/fbb14jz5SQRQAABBBBAAIHKLpDzFrHB+7S3T8ctibWabLFPYs8H7d/BjcGau2DbHf+fA1uydL316Fp+y9CSWCuSJsho2bygzK6G+/RrY922/6l7nI6rAO6jsdtaJH6uHGHWNW5Ux2747R6lNh01er6NHb8kvnyPXVpa81h3TSW1Hvbo2tR6dGsSa937Lp6nMrwYP358vPubAqnvvvvOPvnkExs2bFiJ4mmZxmElpltuuSXeMqOujQq4NL5r1qxZbvnUqVNdd8fEMU1z5swp0aUwcb9du3a1yZMnxxdrLNpzzz1nV111leueqG6JasFSMBdMakVTgJaYHnnkEWvYsGHi4vj7888/v8QkIuryqG6F2Uq33Xaba2UM7l+tZBqb59OqVavin42WqduoWhVlseuuu/psPCOAAAIIIIAAAghUoEBOA7EWzeqZxoW99+/5sSCpnuuCt3Z9cazbXTt79uUZ5TKoK6C6+JWXijdvcVk2/+c5Wf6FSwrdJBjBdT83wUcwX5jXRbFJNzQuLTElHnO79g2sQf3aLlutWDDZoU0DF7T+3Lkk7jMX7zWey89iqBkK58+f72ZS1Ox9waQWMgUAialp06YlFqmb4IABA1zrlSbBUGuYgqXEIEjHSjxGcEeaDTG4jVq+NDmGxl5psgu1jqn1LXEfPXr0sIMPPji4K/c62UyOwUwHHXRQiX0lzhwZzJuJ1/vss49phshgCo4h03KNn/v885/GLqpb49KlS01dQBUokhBAAAEEEEAAAQQqXiCngdj+A9rGKoJml1+4S4kz37d/Gxvxyg+lpkQvkSn2Ri1YC1Pootc9lm/DhmLT+LGy0qy5a+zN9+eVtTrjyzV+7L0xC8rd72vvzHUthj6julfecvWeduxhne2eR5LP7Ofz5vJZ46+C47kUIP33f/+3my1Q47p8UmvNqaee6t/+7LMCJE0yoUBMAdNll11WKr+61mnK+rLSlClTbI89fmp5VCCo7ooab6ayqNVLszQmpp122inlcga31YyLUceIBfdX3muNbdN4uJ9L7dq1c+PlgnkU2Oq81TrZs2fP4CpeI4AAAggggAACCFSAQE5vjw8e0N5eGjnLzrhodPxx5U1fWMtYS9lOvX6aGS6ZQ+uWBbbrTi3s86+WJlsdX6bARbMyjvt6eUqtZ/ENK+kLtQBO+2GVNW1cp5KWcFux1BKkgGf58uWhy6lp8dU18dVXX3XT42v6+cSkZZoOXr8hlpjUCqQujZryPpjUIqfATsGYJq4IBmrBfNX59V577eVOT+P4SAgggAACCCCAAAIVL5CzFrGe3Zta+7b1bUxC97x5sbFh8xast/1jswJOjP1WmE8d222bEjw/Fli1j03hfsqxXW3OvDWxMVwlu/fp98SUNxYHWItmBXbUwZ3cGKvbX5vpd5WxZx2ndkLouig2Hq0whd/3yo9t2LVT8tn1ZpYze6P2X78gZx9VaC+1DK1dW3ImSo1XmjRpUql9qvtg4sQRmmFRrT0aK6aAS13p1NIWTGeccYabCVEzNCqfH/Ok6ev1e2Eaa5YYaGmaeo1J06yKasFK1n1QXfeSlVPd/jp06BAsQqTXmko+8Tia/r5LbFKRVJKm8w/O9ui3URkTuyj6dXr2rXaJn08wD68RQAABBBBAAAEEcieQs9r94H3a2fSZq2Oz/xWWOruxsdkTFUA9NmJafN1dN+ztXm+1ra6L4fgJy133xcQxYhef+9OPP6+LjTebPGOV3XDXVyWmgI/vNOKL/z1/p1J7uOXer+27QABZKsN/FmiyjmHXbPvNq8Q8+tHnn0trY1Pad4gFge1i48Uq8+yJ+s2tNWvWuO5//ve9NIOhn8UweI768ecnnngiuMi9VtCkH0tWN8VkSb85psk3rrvuOjvnnHNcUKXASg/9Fph+6Dkxaap9BXZqEUs2Xk35X3zxRfdI3FY/CB2cCCNxfbrvx44dW6rFTi2JmmY/lTR06NCk2TSJR2JLYDCjglo9NGlHsrFwwby8RgABBBBAAAEEEMi+QK2ioqKSTQ5pHFOtFXroR3Y3btzoWkN+eUXlGceUxqlU+ayP/2VnN0mFKtuaREOTMiRr+Ul2osk+x0y2AiU7ZiaWrV+/3jQmTLMuatyTAi5SNIEFCxaE/h5FOzJbI4AAAggggAACNUsgZy1iNYuVs82FgLr0JXZDzMVxOQYCCCCAAAIIIIAAAlEFEkY8Rd0d2yOAAAIIIIAAAggggAACCJQnQCBWnhDrEUAAAQQQQAABBBBAAIEMCxCIZRiU3SGAAAIIIIAAAggggAAC5QkQiJUnxHoEEEAAAQQQQAABBBBAIMMCBGIZBmV3CCCAAAIIIIAAAggggEB5AgRi5QmxHgEEEEAAAQQQQAABBBDIsACBWIZB2R0CCCCAAAIIIIAAAgggUJ5ARgOxVH9AuLxCsT6cQKb8M7WfcGfBVhUtwOdf0Z8Ax0cAAQQQQACBmiCQkUAsWHGrX5CRXdYE+4ydY0G9PMvLy7Pg5xBm58Htt2zZEmYXbFOFBfSZZ+J7VIUJKDoCCCCAAAIIIJAzgYxFTarE6zGwX+OcFZ4DbRPYd88mGaPwn+OaNWsytk92VDUE1q5dWzUKSikRQAABBBBAAIFqIJAf5RxUad+6dasLwHQnPT8/3046srVt3rzZPv1ynW0s2hpl92xbjkBBvVo2YI9Gzrx27drx1gx9FumkZJ/jypUrTS0kTZs2dftNZ3/krVoC+pxXrVplCr7r168f+ntUtc6a0iKAAAIIIIAAAhUrUKuoKFq0pEqcHps2bbKNGzfa+vXrrbCw0L0uLi52QZmCNT1I0QV8i5WCrTp16li9evVc5blBgwZWUFDggmEFZUrKm2ric0xVqnrky9b3qHrocBYIIIAAAggggED2BSK1iKl4qtApKFDlX4GBggEt03sFYqrgKxGIOYaM/ON9ZVy3bt14AKbPQeuU/HOqB1R+PsdUtapHvmx8j6qHDGeBAAIIIIAAAghkXyByIOaLqEq8uiYq6bWCMgViSj4Yc2/4J7JAMGiSuaz1LHc9oiQ+xyh6VWvbbH6PqpYEpUUAAQQQQAABBHIvEDkQU2VOyQcAvnKnlhoFYL5bIi1imflw5Rs094GTnv1y/5zOEf02fI7pqFXdvPq8g595pr5HVVeEkiOAAAIIIIAAArkViByIqbi+QqeucnqtSp0PwHJ7OjXraN5aZ+0DqCgCfI5R9Krutpn+HlVdCUqOAAIIIIAAAgjkTiAjgZiKq8qcgq9gQEAwlt0PMmjtP4OoR+RzjCpY9bbPxveo6ilQYgQQQAABBBBAILcCGQvEVGzfouK7Ieq9X5bb06pZR8u0sd8fnyPfo5olwNkigAACCCCAAAK5E8hoIOaL7Svy/j3PVVOAz7Fqfm6UGgEEEEAAAQQQQKDyC0SbYq/ynx8lRAABBBBAAAEEEEAAAQQqnQCBWKX7SCgQAggggAACCCCAAAIIVHeB/wd8Gea09a+5agAAAABJRU5ErkJggg==
)


### LIVE EXAMPLE: [Dynamic Filter with Angular Material](https://ivanblazevic.github.io/angular-dynamic-filter/)

# Core Features!

  - Add custom design with custom directive templates
  - Full flexibility based on options configuration
  - Save filter state using local store
  - Core is made with TypeScript and has minimal code attached to angular directive - so it can be used with other JS frameworks

# Input Types

  - OPTIONS - Predefined string array to use in select dropdown
  - TEXT - just a regluar text input
  - AUTOCOMPLETE - pass function for quering backend/frontend

You can also:
  - ...

# API
### OPTION CONFIGURATION

Let's see a basic example of option configuration object:

- **type** - enum value
    - OPTIONS - predefined options, used for classic dropdown/select
    - AUTOCOMPLETE - used for typeaheads [Autocomplete](https://material.angularjs.org/latest/demo/autocomplete)
    - TEXT - basic text input
- **label** - custom label text will be displayed in main option selection
- **field** - this will be key of object which is generated as a result
    > Usually this is table field
- **options** - string array for selection
- **params** - (optional) pass array of custom objects here, e.g. in material design example we passed querySearch param which holds reference to querySearch function from controller. This param is later used in autocomplete dropdown, check here for more details: [Dynamic Filter with Angular Material](https://material.angularjs.org/latest/demo/autocomplete)


#### OPTIONS
```
type: "OPTIONS",
label: "Material",
field: "material",
options: $scope.dataSource.map(function(m) { return m.name })
```
#### AUTOCOMPLETE
```
type: "AUTOCOMPLETE",
label: "Material",
field: "material",
params: {
     querySearch: $scope.querySearch
}
```
#### TEXT
```
type: "TEXT",
label: "Material",
field: "material"
```
License
----

The MIT License

Copyright (c) 2017 Ivan Blazevic

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
