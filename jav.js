

    $(document).ready(function() {
      $("#convertButton").click(function() {
        var fileInput = document.getElementById("imageInput");
        var file = fileInput.files[0];

        if (file) {
          var quality = document.getElementById("qualitySlider").value;
          var grayscale = document.getElementById("grayscaleCheckbox").checked;
          var resize = document.getElementById("resizeCheckbox").checked;
          var width = document.getElementById("widthInput").value;
          var height = document.getElementById("heightInput").value;
          var watermark = document.getElementById("watermarkCheckbox").checked;
          var watermarkText = document.getElementById("watermarkText").value;
          var watermarkColor = document.getElementById("watermarkColor").value;
          var rotate = document.getElementById("rotateCheckbox").checked;
          var rotationAngle = document.getElementById("rotationAngle").value;
          var crop = document.getElementById("cropCheckbox").checked;
          var cropX = document.getElementById("cropX").value;
          var cropY = document.getElementById("cropY").value;
          var cropSize = document.getElementById("cropSize").value;

          var reader = new FileReader();
          reader.onload = function(e) {
            var img = document.createElement("img");
            img.onload = function() {
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");

              var outputImage = document.getElementById("outputImage");

              if (grayscale) {
                ctx.filter = "grayscale(100%)";
              }

              var targetWidth = resize ? width : img.width;
              var targetHeight = resize ? height : img.height;

              canvas.width = targetWidth;
              canvas.height = targetHeight;

              if (rotate) {
                var angle = rotationAngle * (Math.PI / 180);
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(angle);
                ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
              } else {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              }

              if (crop) {
                var size = Math.min(cropSize, canvas.width, canvas.height);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, cropX, cropY, size, size, 0, 0, canvas.width, canvas.height);
              }

              if (watermark) {
                ctx.fillStyle = watermarkColor;
                ctx.font = "30px Arial";
                ctx.fillText(watermarkText, 10, canvas.height - 10);
              }

              var convertedImageURL = canvas.toDataURL("image/png");
              outputImage.src = convertedImageURL;

              // Show the download button
              var downloadButton = document.getElementById("downloadButton");
              downloadButton.href = convertedImageURL;
              downloadButton.style.display = "block";
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
      $("#qualitySlider").on("input", function() {
        var value = $(this).val();
        $("#qualityValue").text(value);
      });
    });
  