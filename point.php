<?php
header('Content-Type: application/json');
session_start();
include 'conexao.php';

// Verifica se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Verifica se o usuário está logado
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(["success" => false, "message" => "not_logged_in"]);
        exit();
    }

    $user_id = $_SESSION['user_id'];
    
    // Obtém os dados da requisição em formato JSON
    $data = json_decode(file_get_contents("php://input"));
    $score = $data->highScore;

    // Tenta estabelecer a conexão com o banco usando PDO
    try {
        // Prepare a consulta SQL para inserção
        $stmt = $pdo->prepare("INSERT INTO user_scores (user_id, score) VALUES (:user_id, :score)");

        // Vincula os parâmetros à consulta
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':score', $score, PDO::PARAM_INT);

        // Executa a consulta
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Score saved successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to save score"]);
        }
    } catch (PDOException $e) {
        // Caso haja algum erro na execução do PDO, exibe a mensagem de erro
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
}
?>
