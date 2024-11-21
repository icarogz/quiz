<?php 
  session_start();
?>          
<!DOCTYPE html>
<html lang="en">
<?php include 'conexao.php'?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QUIZ</title>

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" href="Assets/style.css">

  <script defer src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script defer src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossorigin="anonymous"></script>
  <script defer src="Assets/script.js"></script>

</head>

<body>

  <header class='top-bar'>
    <a href="#" class="top-left-bar" id="top-left-high-scores">QUIZ</a>
    <span id='timer' class="top-right-bar">TEMPO</span>
    <span id='timer' class="top-right-bar">Bem vindo,    <?php echo($_SESSION['nome']);?></span>
  </header>

  <hr>

  <main class="container">
    <header class='row'>
      <h1 class='col-md-12' id='quiz-title'>DIVISÃO</h1>
    </header>
    <section class="row name-input-row">
      <div class="col-md-12">
        <form id="name-input-form" method="POST" action="point.php">
          <div for="name-text">envie sua pontuação </div>
          <a src="./point.php" id="name-text">
            </a>         
       
        </form>
        <button type="submit" class="btn btn-success" id="submit-score">Enviar</button>
      </div>
    </section>

    <section class='container' id='quiz'></section>

    <button type="button" class="btn btn-primary" id='start'>Iniciar</button>
    <button type="button" class="btn btn-info" id='high-scores-btn'>Recordes</button>

    <hr id='answer-bar'>
    <p id="right-wrong"></p>
  </main>

  <div class="floating-image"></div>

</body>

</html>